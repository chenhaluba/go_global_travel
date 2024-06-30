from models.jobHistoryModel import History
from fastapi import HTTPException

async def get_jobs_history(db):
    jobs_history= db.query(History).all()
    return jobs_history

async def get_job_history_by_job_id(job_id,db):
    job = db.query(History).filter(History.job_id == job_id).all()
    if job is None:
        raise HTTPException(status_code=404, detail='History Was Not Found')
    return job


async def add_job_history(job, comments, db):
    new_history_job = History(job_id=job.id, start_time=job.start_time, completion_time=job.completion_time,
            job_name=job.job_name, category=job.category, description=job.description,
            responsible_person=job.responsible_person, responsible_person_email=job.responsible_person_email,
            status=job.status, comments=comments, resolution_comment=job.resolution_comment)
    db.add(new_history_job)
    db.commit()
    db.refresh(new_history_job)
    return new_history_job


async def delete_job_history(id, db):
    jobs_history = db.query(History).filter(History.job_id == id).all()
    if jobs_history is None:
        raise HTTPException(status_code=404, detail='History Was Not Found')
    for job in jobs_history:
        db.delete(job)
    db.commit()
    return 'Deleted!'
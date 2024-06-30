from models.jobModel import Job
from models.commentModel import Comment
from .commentService import add_comment, delete_comments_by_job_id
from .historyService import add_job_history, delete_job_history
from fastapi import HTTPException
from typing import List, Dict
from sqlalchemy.orm import Session

# return all the jobs from sql db
async def get_all_jobs(db):
    jobs= db.query(Job).all()
    return jobs


# return job by specific id from sql db
async def get_job_by_id(id,db):
    job = db.query(Job).filter(Job.id == id).first()
    if job is None:
        raise HTTPException(status_code=404, detail='Job Was Not Found')
    return job


# return all jobs and all the comments. Each job contains all of its comments
async def get_jobs_and_comments(db: Session) -> List[Dict]:
    jobs = db.query(Job).all()
    for job in jobs:
        job.comments = db.query(Comment).filter(Comment.job_id == job.id).all()
    return jobs


# add new job to jobs table- sql db, and if there is a value on field comment, add the comment to comments table
async def add_job(job, db):
    new_job = Job(start_time=job.start_time, completion_time=job.completion_time,
            job_name=job.job_name, category=job.category, description=job.description,
            responsible_person=job.responsible_person, responsible_person_email=job.responsible_person_email,
            status=job.status, resolution_comment=job.resolution_comment)
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    if job.comments != None and  job.comments != '' and job.comments != 'null':
        comment = Comment(job_id=new_job.id, comment=job.comments)
        await add_comment(comment, db=db)
    return job


# update job, the fields that can change is status and resolution comment. add the prevJob to another table called history
async def update_job(updated_job,commentsByID, id, db):
    job = db.query(Job).filter(Job.id == id).first()
    if job is None:
        raise HTTPException(status_code=404, detail='Job Was Not Found')
    job.resolution_comment = updated_job.resolution_comment
    if updated_job.status  == 'Resolved':
            await add_job_history(job, commentsByID, db=db)
    job.status = updated_job.status
    db.commit()
    return job


# update comment job. add the comment and job id to another table called comments
async def update_comments_job(comment_job,id, db):
    job = db.query(Job).filter(Job.id == id).first()
    if job is None:
        raise HTTPException(status_code=404, detail='Job Was Not Found')
    if comment_job != '':
        comment = Comment(job_id=job.id, comment=comment_job)
        await add_comment(comment, db=db)
    db.commit()
    return job


# delete job by specific id from sql db from jobs, comments and history tables in sql db
async def delete_job(id, db):
    job = db.query(Job).filter(Job.id == id).first()
    if job is None:
        raise HTTPException(status_code=404, detail='Job Was Not Found')
    await delete_comments_by_job_id(id, db)
    await delete_job_history(id, db)
    db.delete(job)
    db.commit()
    return "Deleted"
from fastapi import APIRouter
from fastapi import Depends, status
from db.sqlDB import get_db
from sqlalchemy.orm import Session
from services import historyService

router = APIRouter(tags=["history"])

# return all the jobs history from sql db
@router.get("/jobs_history", status_code=status.HTTP_200_OK)
async def get_jobs(db: Session = Depends(get_db)):
    return await historyService.get_jobs_history(db)


# return job history by id from sql db
@router.get("/jobs_history/{job_id}", status_code=status.HTTP_200_OK)
async def get_history_by_id(job_id,db: Session = Depends(get_db)):
    return await historyService.get_job_history_by_job_id(job_id, db)


# delete job history by id from history table in sql db  
@router.delete("/delete_job_history/{job_id}", status_code=status.HTTP_200_OK)
async def delete_job(job_id,db: Session = Depends(get_db)):
    return await historyService.delete_job_history(job_id, db)

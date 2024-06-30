from fastapi import APIRouter
from fastapi import Depends, status
from models.jobModel import Base, Job
from models.commentModel import Comment
from schemas.jobSchema import JobSchema, JobStatusSChema
from db.sqlDB import engine, get_db
from sqlalchemy.orm import Session
from services import jobService, commentService

router = APIRouter(tags=["jobs"])

@router.get("/jobs", status_code=status.HTTP_200_OK)
async def get_jobs(db: Session = Depends(get_db)):
    return await jobService.get_all_jobs(db)


@router.get("/comments", status_code=status.HTTP_200_OK)
async def get_comments(db: Session = Depends(get_db)):
    return await commentService.get_all_comments(db)

@router.get("/comments/{job_id}", status_code=status.HTTP_200_OK)
async def get_comments_by_id(job_id,db: Session = Depends(get_db)):
    return await commentService.get_comments_by_id(job_id, db)

@router.get("/jobs_and_comments", status_code=status.HTTP_200_OK)
async def get_jobs_and_comments(db: Session = Depends(get_db)):
    return await jobService.get_jobs_and_comments(db)

@router.post("/add_job", status_code=status.HTTP_201_CREATED)
async def add_job(request:JobSchema, db : Session = Depends(get_db)):
    return await jobService.add_job(job=request, db=db)


@router.get("/get_job/{id}", status_code=status.HTTP_200_OK)
async def get_job_by_id(id,db: Session = Depends(get_db)):
    return await jobService.get_job_by_id(id, db)


@router.put("/update_job/{id}/{commentsByID}", status_code=status.HTTP_200_OK)
async def update_job_by_id(request:JobStatusSChema,commentsByID:str, id,db: Session = Depends(get_db)):
    return await jobService.update_job(updated_job=request,commentsByID=commentsByID,id=id, db=db)

@router.put("/update_comments_job/{id}", status_code=status.HTTP_200_OK)
async def update_comments_job_by_id(comment_job, id,db: Session = Depends(get_db)):
    return await jobService.update_comments_job(comment_job,id, db)   

@router.delete("/delete_job_and_comments/{id}", status_code=status.HTTP_200_OK)
async def delete_job(id,db: Session = Depends(get_db)):
    return await jobService.delete_job(id, db)


@router.delete("/delete_comment/{comment_id}", status_code=status.HTTP_200_OK)
async def delete_comment(comment_id,db: Session = Depends(get_db)):
    return await commentService.delete_comment(comment_id, db)
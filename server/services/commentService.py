from models.commentModel import Comment 
from fastapi import HTTPException


async def get_all_comments(db):
    comments= db.query(Comment).all()
    return comments

async def get_comments_by_id(job_id, db):
    comments = db.query(Comment).filter(Comment.job_id == job_id).all()
    if comments is None:
        raise HTTPException(status_code=404, detail='Comment Was Not Found')
    return comments

async def add_comment(comment, db):
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return 'Comment Created!'

async def delete_comment(comment_id, db):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail='Comment Was Not Found')
    db.delete(comment)
    db.commit()
    return "Comment Deleted"

async def delete_comments_by_job_id(id, db):
    comments = db.query(Comment).filter(Comment.job_id == id).all()
    if comments is None:
        raise HTTPException(status_code=404, detail='Comment Was Not Found')
    for comment in comments:
        db.delete(comment)
    db.commit()
    return "Comments Deleted"
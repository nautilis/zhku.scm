"""add accepted and rejected to apply

Revision ID: 66267180c472
Revises: dffd8f3defc5
Create Date: 2018-05-02 06:49:01.979312

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66267180c472'
down_revision = 'dffd8f3defc5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('apply', sa.Column('accepted', sa.Integer(), nullable=True))
    op.add_column('apply', sa.Column('rejected', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('apply', 'rejected')
    op.drop_column('apply', 'accepted')
    # ### end Alembic commands ###

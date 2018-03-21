"""add club_admin

Revision ID: 939fddea57f5
Revises: 370b30ebdc60
Create Date: 2018-03-18 10:18:10.938702

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '939fddea57f5'
down_revision = '370b30ebdc60'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('club_admin',
    sa.Column('date_created', sa.DateTime(), nullable=True),
    sa.Column('date_modified', sa.DateTime(), nullable=True),
    sa.Column('caid', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('caid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('club_admin')
    # ### end Alembic commands ###

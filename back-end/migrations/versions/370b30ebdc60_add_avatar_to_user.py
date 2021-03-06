"""add avatar to user

Revision ID: 370b30ebdc60
Revises: c4e0158aabca
Create Date: 2018-03-12 23:37:25.373983

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '370b30ebdc60'
down_revision = 'c4e0158aabca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('avatar', sa.String(length=1024), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'avatar')
    # ### end Alembic commands ###

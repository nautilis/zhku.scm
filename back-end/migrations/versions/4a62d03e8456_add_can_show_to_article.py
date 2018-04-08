"""add can_show to article 

Revision ID: 4a62d03e8456
Revises: 4f8305c921ee
Create Date: 2018-04-08 19:42:51.631617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4a62d03e8456'
down_revision = '4f8305c921ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('article', sa.Column('can_show', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('article', 'can_show')
    # ### end Alembic commands ###

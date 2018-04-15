"""add desc and address to club

Revision ID: 7296546483f4
Revises: 4a62d03e8456
Create Date: 2018-04-13 06:47:06.103261

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7296546483f4'
down_revision = '4a62d03e8456'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('club', sa.Column('address', sa.String(length=1024), nullable=True))
    op.add_column('club', sa.Column('desc', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('club', 'desc')
    op.drop_column('club', 'address')
    # ### end Alembic commands ###
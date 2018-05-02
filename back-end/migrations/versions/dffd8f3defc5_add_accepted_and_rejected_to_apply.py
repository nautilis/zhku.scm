"""add accepted and rejected to apply

Revision ID: dffd8f3defc5
Revises: ef86b3c13081
Create Date: 2018-05-01 23:15:06.555478

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dffd8f3defc5'
down_revision = 'ef86b3c13081'
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

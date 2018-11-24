class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :quantity, :price

  belongs_to :user
end

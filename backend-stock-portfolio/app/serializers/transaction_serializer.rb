class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :quantity, :price
end

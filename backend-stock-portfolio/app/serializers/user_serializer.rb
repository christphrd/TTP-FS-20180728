class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :account_balance

  has_many :transactions
end

class UsersController < ApplicationController

def index
  render json: {message: 'Hello user controller'}
end

def show

end

def login
  render json: { token: user_token() }
end

def create

end


end

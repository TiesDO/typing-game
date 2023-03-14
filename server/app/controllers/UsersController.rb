require 'digest'
require 'json'

class UsersController < ApplicationController

# TODO: Show the users account details and a list of their previous scores
def index
  render json: {message: 'Hello user controller'}
end

# TODO: Show a users username and their avarage of the last (at most) 10 scores, highest and lowest of all time
def show

end

# TODO: Return a simple authorization token when a correct username and password have been provided
def login
  render json: { token: user_token() }
end

# TODO: Create a new users based on the information given
def create
  body_json = JSON.parse(request.body.read)
  
  # TODO: validate parameters

  double = User.where(username: body_json['username'])
  return render json: { status: 'ERROR', message: 'username already exists'}, status: '409' if double.length > 0

  User.create({ username: body_json['username'], password: body_json['password'] })
  return render json: { status: 'SUCCESS', message: 'user successfully created' }, status: '201'

end

end

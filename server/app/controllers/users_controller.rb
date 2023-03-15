require 'digest'
require 'json'

class UsersController < ApplicationController
  def index
    user = get_token();

    if user.nil?
      return render json: {
        status: 'ERROR',
        message: 'invalid token'
      }, status: '401'
    end

    found = User.where(id: user['id'])

    # if a token is not found the user was either deleted or the token has been forged
    if found.empty?
      render json: {
        status: 'ERROR',
        message: 'Uhmm...'
      }, status: '500'
    end

    found = found[0]

    render json: {
      status: 'SUCCESS',
      message: 'Profile found',
      data: {
        username: found['username'],
        joined: found['created_at']
      }
    }, status: '200'
  end

  # TODO: Show a users username and their avarage of the last (at most) 10 scores, highest and lowest of all time
  def show; end

  def login
    body_json = JSON.parse(request.body.read)

    un = body_json['username']
    pw = body_json['password']

    if un.nil? || pw.nil?
      return render json: {
        status: 'ERROR',
        message: 'username and password must be provided'
      }, status: 400
    end

    found = User.where({ username: un, password: pw })

    if found.length <= 0
      return render json: {
        status: 'ERROR',
        message: 'user not found'
      }, status: 200
    end

    token = JSON.dump({ id: found[0].id, un: found[0].username })
    render json: {
      status: 'SUCCESS',
      message: 'log in successfully',
      data: sign_token(token)
    }, status: '200'
  end

  def create
    body_json = JSON.parse(request.body.read)

    # WARN: not validating parameters

    double = User.where(username: body_json['username'])
    if !double.empty?
      return render json: {
        status: 'ERROR',
        message: 'username already exists'
      }, status: '409'
    end

    User.create({ username: body_json['username'], password: body_json['password'] })
    render json: {
      status: 'SUCCESS',
      message: 'user successfully created'
    }, status: '201'
  end
end

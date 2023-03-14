class ApplicationController < ActionController::API

def user_token
  # TODO: For now the auth token will be the username
  request.headers['Authorization']
end

end

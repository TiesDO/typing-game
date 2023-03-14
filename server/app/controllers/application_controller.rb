class ApplicationController < ActionController::API

# TODO: Parse a given custom jwt like token from the Authorization header
def get_token
  request.headers['Authorization']
end

# TODO: Validate the users token
def validate_token

end

# TODO: Sign a users token
def sign_token

end

end

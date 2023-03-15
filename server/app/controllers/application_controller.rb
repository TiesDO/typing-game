require 'digest'
require 'base64'
require 'json'

class ApplicationController < ActionController::API

def get_token
  head = request.headers['Authorization']

  return nil if head.nil?

  # parse the header value
  split_head = head.split

  return nil if split_head[0] != 'Bearer'

  return nil if !validate_token(split_head[1])

  return JSON.parse Base64.urlsafe_decode64(split_head[1].split('.')[0])
end

def validate_token(token)
  payload = token.split('.')[0]

  return sign_token(Base64.urlsafe_decode64 (payload)) === token
end

def sign_token(payload)
  salt_token = "mysecretsalt"

  payload = Base64.urlsafe_encode64 payload # use encoded payload inside signature

  hash = Digest::MD5.new
  hash << payload
  hash << salt_token

  signature = Base64.urlsafe_encode64(hash.hexdigest)

  return "#{payload}.#{signature}"
end

end

# -*- coding: utf-8 -*-

require 'sinatra/reloader'
require 'sinatra/json'
require 'base64'

class Application < Sinatra::Base
  
  set :json_content_type, 'application/json; charset=utf-8'
  
  def logger
    env['app.logger'] || env['rack.logger']
  end
  
  configure do
    enable :logging
  end
  
  configure :development do
    register Sinatra::Reloader
  end
  
  before do
    cache_control :no_cache
  end
  
  get '/' do
    erb :index
  end
  
  post '/photo/create' do
    dir = File.expand_path('../photo', File.dirname(__FILE__))
    path = File.join(dir, DateTime.now.strftime('%Y_%m%d_%H%M_%S_%L') + '.png')
    
    File.open(path, 'wb') do |file|
      file.write(Base64.decode64(params[:img]))
    end
  end
  
end

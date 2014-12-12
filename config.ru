# -*- coding: utf-8 -*-
$:.unshift File.expand_path('./lib', File.dirname(__FILE__))

require 'rubygems'
require 'pp'
require 'logger'
require 'app_log'

# WEBrick configuration
class Rack::Handler::WEBrick
  class << self
    alias_method :run_original, :run
  end
  def self.run(app, options={})
    options[:DoNotReverseLookup] = true
    #options[:Logger] = Logger.new('./log/server.log', 5, 512)
    run_original(app, options)
  end
end

# Auto create log directory
Dir.mkdir('./log') unless Dir.exist?('./log')

# Rack log
rack_log = File.expand_path("./log/#{ENV['RACK_ENV']}.log", File.dirname(__FILE__))
rack_logger = Logger.new(rack_log, 'daily'); def rack_logger.write(msg) self << msg; end
use Rack::CommonLogger, rack_logger

# Application log
app_log = File.expand_path('./log/app.log', File.dirname(__FILE__))
app_logger = Logger.new(app_log, 'daily'); def app_logger.write(msg) self << msg; end
use AppLog, app_logger

# Application start
require 'application.rb'
run Application

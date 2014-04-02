require 'rack-proxy'

class Proxy < Rack::Proxy
    def initialize(app)
        @app = app
    end

    def rewrite_env(env)
        env["HTTP_HOST"] = "http://localhost:4567"
    end
end

use Rack::Session::Cookie, :key => 'dex-web', :path => '/', :secret => 'snowbird ribosome reposit folium routine assert merely if'
map '/dex-dev-mobile' do
    run Rack::Proxy.new(:backend => "http://localhost:4567/")
end
use Rack::Static, :urls => ["/"], :root => '.', :index => 'index.html'
run Rack::File.new('/')



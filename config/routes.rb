class ActionDispatch::Routing::Mapper
  def draw routes_name
    instance_eval File.read(Rails.root.join("config/routes/#{routes_name}.rb"))
  end
end

Rails.application.routes.draw do
  draw :api
  devise_for :users
  root "react_app#home"
  get "*path", to: "react_app#home"
end

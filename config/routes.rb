Rails.application.routes.draw do
  devise_for :users
  resources :templates
  resources :sites
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'welcome#index'

end

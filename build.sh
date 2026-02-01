#!/bin/bash
# Build script for Vercel with UTF-8 encoding support

export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export RUBYOPT="-E utf-8"

yum install -y zlib-devel

gem install jekyll
gem install bundler
gem install json

bundle install
bundle exec jekyll build
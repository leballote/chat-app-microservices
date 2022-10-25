#!/bin/sh
tmux rename-window chat-app
tmux new-session -d
tmux split-window -v "cd services/chat && npm run dev"
tmux split-window -h "cd services/user && npm run dev"
tmux split-window -h "cd services/auth && npm run dev"
tmux selectp -t 0
tmux split-window -h "cd front/ && npm run dev"
tmux selectp -t 0
#I will let it tiled for now
tmux select-layout tiled
cd gateway && npm run dev
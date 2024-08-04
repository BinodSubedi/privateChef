# Install Ollama into the machine
link: https://ollama.com/download  
## Installing Models for embeding generation and Response sythesizer[Or you could say a llm that will contextualize and summarize all the random related data to the context of qsns]  
- Go to Bash/CMD(any of your favourite command line tool), and install or pull Gemma2:2b(or any you like, though do know your RAM range) and any embedding model of your choice
## Make sure you have docker installed(Cause qdrant(the vector database in this project) has to be running in the system and most easy setup is with docker container)  
- Run : docker run -p 6333:6333 qdrant/qdrant

## Now clone the repo and go into each folder and run npm install and have the dependencies be pulled for running the project.  
- First run the qdrant database
- run the secondary backend
- run the primary backend
- any finally the front-end

### For running these units, go to package.json, all of them have at least start or dev script

up:
	@docker compose up -d
down:
	@docker compose down
delete:
	@sudo rm -rf ./mysql

login-test:
	curl -X POST -H "Content-Type: application/json" -d '{"username":"admin", "password":"admin"}' localhost:8080/login
login-get-test:
	curl -X GET localhost:8080/login
signup-test:
	curl -X POST -H "Content-Type: application/json" -d '{"username":"admin", "password":"admin", "email":"admin@gmail.com"}' localhost:8080/register
newperson-test:
	curl -X POST -H "Content-Type: application/json" -d '{"username":"admin", "password":"admin", "email":"admin@gmail.com"}' localhost:8080/newperson
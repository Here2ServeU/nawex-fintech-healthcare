up:
	docker-compose up --build

down:
	docker-compose down

seed:
	./scripts/seed-fintech-data.sh
	./scripts/seed-healthcare-data.sh

bootstrap:
	./scripts/bootstrap.sh

#!/bin/sh

if [ "$DB_MIGRATE" = "true"  ]
then
  count=0
  MAX=${DB_MIGRATE_RETRIES:-15}
  SLEEP=${DB_MIGRATE_WAIT_TIME:-5}
  echo "Waiting database for migration..."
  while true
  do
    [ $count -ge $MAX ] && echo "No more retries... Exiting with error." && exit 1
    nc -z $DATABASE_URL $DB_PORT && break
    let count++
    echo "$count out of $MAX retries"
    sleep $SLEEP
  done
  echo "Migrating database"
  npx sequelize-cli db:migrate || exit 1
fi


echo "Starting service"
npm start
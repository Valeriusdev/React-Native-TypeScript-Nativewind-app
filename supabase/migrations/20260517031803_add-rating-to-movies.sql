alter table movies
add column rating integer
check (rating between 1 and 5);
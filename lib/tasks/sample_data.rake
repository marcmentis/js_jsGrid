# Create data for patients
namespace :db do
	desc "Fill database with sample data "
	task populate: :environment do
		250.times do |n|
			first_name = Faker::Name.first_name
			last_name = Faker::Name.last_name
			c_number = Faker::Number.number(7)


			Inpatient.create!(first_name: first_name,
						last_name: last_name,
						c_number: c_number,
						ward: '81/101')
		end
	end
end
json.array!(@inpatients) do |inpatient|
  json.extract! inpatient, :id, :first_name, :last_name, :c_number, :ward, :diagnosis
  json.url inpatient_url(inpatient, format: :json)
end

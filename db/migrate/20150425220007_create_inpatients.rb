class CreateInpatients < ActiveRecord::Migration
  def change
    create_table :inpatients do |t|
      t.string :first_name
      t.string :last_name
      t.integer :c_number
      t.string :ward
      t.string :diagnosis

      t.timestamps
    end
  end
end

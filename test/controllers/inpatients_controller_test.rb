require 'test_helper'

class InpatientsControllerTest < ActionController::TestCase
  setup do
    @inpatient = inpatients(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:inpatients)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create inpatient" do
    assert_difference('Inpatient.count') do
      post :create, inpatient: { c_number: @inpatient.c_number, diagnosis: @inpatient.diagnosis, first_name: @inpatient.first_name, last_name: @inpatient.last_name, ward: @inpatient.ward }
    end

    assert_redirected_to inpatient_path(assigns(:inpatient))
  end

  test "should show inpatient" do
    get :show, id: @inpatient
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @inpatient
    assert_response :success
  end

  test "should update inpatient" do
    patch :update, id: @inpatient, inpatient: { c_number: @inpatient.c_number, diagnosis: @inpatient.diagnosis, first_name: @inpatient.first_name, last_name: @inpatient.last_name, ward: @inpatient.ward }
    assert_redirected_to inpatient_path(assigns(:inpatient))
  end

  test "should destroy inpatient" do
    assert_difference('Inpatient.count', -1) do
      delete :destroy, id: @inpatient
    end

    assert_redirected_to inpatients_path
  end
end

class InpatientsController < ApplicationController
  include JqgridHelper
  before_action :set_inpatient, only: [:show, :edit, :update, :destroy]

  # GET /inpatients
  # GET /inpatients.json
  def index
    @inpatients = Inpatient.all
    if params[:page] != nil
      total_query_count = Inpatient.all.count     
      # Run query and extract just those rows needed
      extract = Inpatient.order("#{params[:sidx]} #{params[:sord]}")
                          .limit(params[:rows].to_i)
                          .offset((params[:page].to_i - 1) * params[:rows].to_i)

      @jsGrid_obj = create_jsGrid_obj(extract, params, total_query_count)
    end

    respond_to do |format|
      format.html
      format.json {render json: @jsGrid_obj }
    end
  end

  def big_search
    # ActiveRecord relations are lazy loaders and can be chained
    # Therefore, sequental .where searches IF PARAM not zero will filter with an 'AND' relationship
    # Database will not be hit (lazy loading) until data needed by app
    conditions = Inpatient.all 
    conditions = conditions.where("diagnosis = :diagnosis", {diagnosis: params[:diagnosis]}) if params[:diagnosis]!= ''
    conditions = conditions.where("first_name = :first_name", {first_name: params[:first_name]}) if params[:first_name]!= ''
    conditions = conditions.where("last_name = :last_name", {last_name: params[:last_name]}) if params[:last_name]!= ''
    conditions = conditions.where("c_number = :c_number", {c_number: params[:c_number]}) if params[:c_number]!= ''
    conditions = conditions.where("ward = :ward", {ward: params[:ward]}) if params[:ward]!= ''


    # total_query = Inpatient.where("diagnosis = :diagnosis", {diagnosis: params[:diagnosis]}
                            # ).where("first_name = :first_name", {first_name: params[:first_name]});
    total_query = conditions
    total_query_count = total_query.count

# Run query and extract just those rows needed
      extract = conditions
                    .order("#{params[:sidx]} #{params[:sord]}")
                    .limit(params[:rows].to_i)
      @jsGrid_obj = create_jsGrid_obj(extract, params, total_query_count)
    respond_to do |format|
      format.html
      format.json {render json: @jsGrid_obj }
    end
  end

  # GET /inpatients/1
  # GET /inpatients/1.json
  def show
  end

  # GET /inpatients/new
  def new
    @inpatient = Inpatient.new
  end

  # GET /inpatients/1/edit
  def edit
  end

  # POST /inpatients
  # POST /inpatients.json
  def create
    @inpatient = Inpatient.new(inpatient_params)

    respond_to do |format|
      if @inpatient.save
        format.html { redirect_to @inpatient, notice: 'Inpatient was successfully created.' }
        format.json { render action: 'show', status: :created, location: @inpatient }
      else
        format.html { render action: 'new' }
        format.json { render json: @inpatient.errors, status: :unprocessable_entity }
      end
    end
  end

  def create_json
    # byebug
    @inpatient = Inpatient.new(inpatient_params)

    respond_to do |format|
      if @inpatient.save
        format.json {head :no_content}
      else
        format.json { render json: @inpatient.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /inpatients/1
  # PATCH/PUT /inpatients/1.json
  def update
    respond_to do |format|
      if @inpatient.update(inpatient_params)
        format.html { redirect_to @inpatient, notice: 'Inpatient was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @inpatient.errors, status: :unprocessable_entity }
      end
    end
  end


  # DELETE /inpatients/1
  # DELETE /inpatients/1.json
  def destroy
    @inpatient.destroy
    respond_to do |format|
      format.html { redirect_to inpatients_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inpatient
      @inpatient = Inpatient.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def inpatient_params
      params.require(:inpatient).permit(:first_name, :last_name, :c_number, :ward, :diagnosis)
    end
    
end

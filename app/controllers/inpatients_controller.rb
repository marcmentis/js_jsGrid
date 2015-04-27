class InpatientsController < ApplicationController
  before_action :set_inpatient, only: [:show, :edit, :update, :destroy]

  # GET /inpatients
  # GET /inpatients.json
  def index
    @inpatients = Inpatient.all
    if params[:page] != nil
      
      # byebug
      # @inpatients = Inpatient.all

      all_inpatients = Inpatient.all
      page = params[:page].to_f  # page from view
      rows_per_page = params[:rows].to_f  # rows from view
      records = all_inpatients.count # total records from query
      total = (records/rows_per_page).ceil  # total pages needed for all records

      # Extract required rows from all_inpatients
      extract = Inpatient.find(
          :all,
          :limit => params[:rows],
          :offset => (params[:page].to_i - 1) * params[:rows].to_i
        );
      
      rows = extract.map do |r|
        rows = {"id" => r.id, 
                "cell" => [r.id, r.first_name, r.last_name, r.c_number, r.ward, r.diagnosis]
                 }
      end

      @jsGrid_obj = { "total" => total, 
                      "page" => page, 
                      "records" => records,
                      "rows" => rows
                    }
      puts "jsGrid_obj: \n #{@jsGrid_obj}"
      puts "jsGrid_obj.count: \n #{@jsGrid_obj.count}"
    end

    # @inpatients = Inpatient.find(
    #     :all,
    #     # :conditions => ["id = ?", params[:q]],
    #     :limit => params[:rows],
    #     :offset => (params[:page].to_i - 1) * params[:rows].to_i
    #   );

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

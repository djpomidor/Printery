<form id="order_form" action="http://localhost:8000/create-order" method="post">
  <div className="row gx-4 gy-5 pb-5">
    <div className="">
      Order ID: <input type="text" name="number" value="32" readonly="readonly" required="" id="id_number" />
      <input type="hidden" name="initial-number" value="32" id="initial-id_number" />
    </div>
    <div className="col-md-6"><label className="form-label">Name</label>
      <input type="text" name="name" className="form-control" placeholder="Order name" maxlength="16" id="id_name" />
      <span className="d-block mt-2 text-sm text-muted">Short name of the product</span>
    </div>
    <div className="col-md-6">
      <label className="form-label">Type</label> 
      <select name="type" type="text" className="form-select" placeholder="Book, magazin, ets." id="id_type">
        <option value="" selected="">Select...</option>

        <option value="BK">Book</option>

        <option value="CL">Calendar</option>

        <option value="MZ">Magazine</option>

        <option value="NP">Newspaper</option>

        <option value="FL">Flyers</option>

      </select>
      <span className="d-block mt-2 text-sm text-muted">Select type of product</span>
    </div>
  </div>

  <div className="row gx-4 gy-5 pb-5">
    <div className="col-md-6"><label className="form-label">Circulation</label>
      <input type="text" name="circulation" className="form-control" placeholder="Circulation" id="id_circulation" />
    </div>
    <div className="col-md-6"><label className="form-label">Binding</label>
      <select name="binding" type="text" className="form-select" placeholder="Binding style" id="id_binding">
        <option value="" selected="">Select...</option>

        <option value="GLU">Glue</option>

        <option value="STA">Staple</option>

        <option value="HAR">Hardcover</option>

        <option value="FOL">Folding</option>

      </select>
    </div>
  </div>

  <div className="row gx-4 gy-5">
    <div className="col">
      <div>
        <label className="form-label">Width (mm)</label>
        <input type="text" name="width" className="form-control" placeholder="width" id="id_width" />
      </div>
    </div>
    <div className="cross text-xs col-sm-1 gy-18"></div>
    <div className="col">
      <div>
        <label className="form-label">Height (mm)</label>
        <input type="text" name="height" className="form-control" placeholder="height" id="id_height" />
      </div>
    </div>
  </div>




  <div className="collapse show" id="partCard-1">
    <div className="card ">

      <div className="card-body pb-0">
        <button type="button" className="part-btn-close float-end" data-bs-toggle="collapse" data-bs-target="#partCard-1" aria-expanded="true" aria-controls="partCard-0"></button>
        <div className="d-flex justify-content-between">
          <h5 style="text-align: center;">
            Block
          </h5>
        </div>
        <div className="row">
          <div className="">
            <input type="hidden" name="form-0-part_name" className="form-select" placeholder="Aaaa" id="id_form-0-part_name" />
          </div>
          <div className="col gy-5">
            <div>
              <label className="form-label">Number of pages </label>
              <input type="text" name="form-0-pages" className="form-control" placeholder="Number of pages..." id="id_form-0-pages" />
            </div>
          </div>
          <div className="col-sm-3 gy-5">
            <div>
              <label className="form-label">Printing color</label>
              <select name="form-0-color" type="text" className="form-control" placeholder="color" id="id_form-0-color">
                <option value="" selected="">Select...</option>

                <option value="4_4">4(CMYK)+4(CMYK)</option>

                <option value="4_0">4(CMYK)+0</option>

                <option value="1_1">1(Black)+1(Black)</option>

              </select>
            </div>
          </div>
          <div className="col gy-5">
            <div>
              <label className="form-label">Paper</label>
              <select name="form-0-paper" type="text" className="form-control" placeholder="Select paper..." id="id_form-0-paper">
                <option value="" selected="">---------</option>

                <option value="1">Omega Glossy 150 gr/m2</option>

                <option value="2">Omela Matte 115 gr/m2</option>

                <option value="3">Lux Cream Glossy 120 gr/m2</option>

                <option value="4">Aralda Offset 80 gr/m2</option>

              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="collapse show" id="partCard-2">
    <div className="card ">

      <div className="card-body pb-0">
        <button type="button" className="part-btn-close float-end" data-bs-toggle="collapse" data-bs-target="#partCard-2" aria-expanded="true" aria-controls="partCard-1"></button>
        <div className="d-flex justify-content-between">
          <h5 style="text-align: center;">
            Cover
          </h5>
        </div>
        <div className="row">
          <div className="">
            <input type="hidden" name="form-1-part_name" className="form-select" placeholder="Aaaa" id="id_form-1-part_name" />
          </div>
          <div className="col gy-5">
            <div>
              <label className="form-label">Number of pages </label>
              <input type="text" name="form-1-pages" className="form-control" placeholder="Number of pages..." id="id_form-1-pages" />
            </div>
          </div>
          <div className="col-sm-3 gy-5">
            <div>
              <label className="form-label">Printing color</label>
              <select name="form-1-color" type="text" className="form-control" placeholder="color" id="id_form-1-color">
                <option value="" selected="">Select...</option>

                <option value="4_4">4(CMYK)+4(CMYK)</option>

                <option value="4_0">4(CMYK)+0</option>

                <option value="1_1">1(Black)+1(Black)</option>

              </select>
            </div>
          </div>
          <div className="col gy-5">
            <div>
              <label className="form-label">Paper</label>
              <select name="form-1-paper" type="text" className="form-control" placeholder="Select paper..." id="id_form-1-paper">
                <option value="" selected="">---------</option>

                <option value="1">Omega Glossy 150 gr/m2</option>

                <option value="2">Omela Matte 115 gr/m2</option>

                <option value="3">Lux Cream Glossy 120 gr/m2</option>

                <option value="4">Aralda Offset 80 gr/m2</option>

              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="collapse show" id="partCard-3">
    <div className="card ">

      <div className="card-body pb-0">
        <button type="button" className="part-btn-close float-end" data-bs-toggle="collapse" data-bs-target="#partCard-3" aria-expanded="true" aria-controls="partCard-2"></button>
        <div className="d-flex justify-content-between">
          <h5 style="text-align: center;">
            Insert
          </h5>
        </div>
        <div className="row">
          <div className="">
            <input type="hidden" name="form-2-part_name" className="form-select" placeholder="Aaaa" id="id_form-2-part_name" />
          </div>
          <div className="col gy-5">
            <div>
              <label className="form-label">Number of pages </label>
              <input type="text" name="form-2-pages" className="form-control" placeholder="Number of pages..." id="id_form-2-pages" />
            </div>
          </div>
          <div className="col-sm-3 gy-5">
            <div>
              <label className="form-label">Printing color</label>
              <select name="form-2-color" type="text" className="form-control" placeholder="color" id="id_form-2-color">
                <option value="" selected="">Select...</option>

                <option value="4_4">4(CMYK)+4(CMYK)</option>

                <option value="4_0">4(CMYK)+0</option>

                <option value="1_1">1(Black)+1(Black)</option>

              </select>
            </div>
          </div>
          <div className="col gy-5">
            <div>
              <label className="form-label">Paper</label>
              <select name="form-2-paper" type="text" className="form-control" placeholder="Select paper..." id="id_form-2-paper">
                <option value="" selected="">---------</option>

                <option value="1">Omega Glossy 150 gr/m2</option>

                <option value="2">Omela Matte 115 gr/m2</option>

                <option value="3">Lux Cream Glossy 120 gr/m2</option>

                <option value="4">Aralda Offset 80 gr/m2</option>

              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="row gx-4">
    <div className="col-md-6">
      <div>
        <label className="form-label">Due date</label>
        <div className="input-group datepicker">
          <span className="input-group-text pe-2"><i className="bi bi-calendar"></i> </span>
          <input type="text" name="due_date" className="form-control flatpickr-input" placeholder="Select date" id="id_due_date" readonly="readonly" />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div>
        <label classNameName="form-label">Delivery date</label>
        <div className="input-group datepicker">
          <span className="input-group-text pe-2"><i className="bi bi-calendar"></i> </span>
          <input type="text" name="delivery_date" className="form-control flatpickr-input" placeholder="Select date" id="id_delivery_date" readonly="readonly" />
        </div>
      </div>
    </div>
  </div>


  <div><label className="form-label">Description</label>
    <textarea className="form-control" placeholder="order description ..." rows="2"></textarea>
  </div>


  <button type="submit" form="order_form" className="btn btn-sm btn-primary"><span>Save</span></button>
</form>
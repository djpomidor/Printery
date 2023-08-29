import React from 'react'
import GetFilteredOrders from './GetFilteredOrders'

const RightPanel = () => {
  return (
    <div className="col-lg-4">
    <div className="card position-sticky top-32">
      <div className="card-body pb-0">
        <h6 className="mb-4">Orders</h6>
        <GetFilteredOrders/>
          <hr className="mt-4 mb-0" />
          {/* <div className="list-group list-group-flush">
            <div className="list-group-item">
              <div className="d-flex align-items-center">
                <h6 className="text-sm text-muted font-semibold">Our employees</h6>
                <div className="dropdown ms-auto">
                  <a href="#" className="text-muted text-primary-hover" data-bs-toggle="dropdown" data-bs-autoclose="outside" aria-expanded="false">
                    <i className="bi bi-gear"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end w-64">
                    <div className="dropdown-header"><h6 className="text-sm font-semibold">Assign up to 10 people</h6></div>
                    <div className="dropdown-item">
                      <div className="input-group input-group-sm input-group-inline">
                        <span className="input-group-text ps-3 pe-1"><i className="bi bi-search"></i> </span><input type="email" className="form-control" placeholder="Search" aria-label="Search" />
                      </div>
                    </div>
                    <div className="dropdown-item d-flex align-items-center">
                      <div className="flex-none"><img alt="..." className="avatar avatar-xs rounded-circle" src="/static/printery/img/img-profile-3.jpg" /></div>
                      <div className="flex-fill ms-3"><a href="#" className="text-sm text-heading font-semibold mb-0">Robert Fox</a></div>
                    </div>
                    <div className="dropdown-item d-flex align-items-center">
                      <div className="flex-none"><img alt="..." className="avatar avatar-xs rounded-circle" src="/static/printery/img/img-profile.jpg" /></div>
                      <div className="flex-fill ms-3"><a href="#" className="text-sm text-heading font-semibold mb-0">Darlene Robertson</a></div>
                    </div>
                    <div className="dropdown-item d-flex align-items-center">
                      <div className="flex-none"><img alt="..." className="avatar avatar-xs rounded-circle" src="/static/printery/img/img-profile-2.jpg" /></div>
                      <div className="flex-fill ms-3"><a href="#" className="text-sm text-heading font-semibold mb-0">Theresa Webb</a></div>
                    </div>
                    <div className="dropdown-item d-flex align-items-center">
                      <div className="flex-none"><img alt="..." className="avatar avatar-xs rounded-circle" src="/static/printery/img/img-profile-3.jpg" /></div>
                      <div className="flex-fill ms-3"><a href="#" className="text-sm text-heading font-semibold mb-0">Kristin Watson</a></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vstack gap-3 mt-3">
                <div className="d-flex align-items-center">
                  <div className="flex-none"><img alt="..." className="avatar w-5 h-5 rounded-circle" src="/static/printery/img/img-profile-2.jpg" /></div>
                  <div className="flex-fill ms-3"><a href="#" className="text-sm text-heading font-semibold mb-0">Mark Branson</a></div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-none"><img alt="..." className="avatar w-5 h-5 rounded-circle" src="/static/printery/img/img-profile-3.jpg" /></div>
                  <div className="flex-fill ms-3"><a href="#" className="text-sm text-heading font-semibold mb-0">Sara Summer</a></div>
                </div>
              </div>
            </div>
            <div className="list-group-item">
              <div className="d-flex align-items-center">
                <h6 className="text-sm text-muted font-semibold">Status</h6>
                <div className="dropdown ms-auto">
                  <a href="#" className="text-muted text-primary-hover" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-gear"></i></a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="dropdown-header"><h6 className="text-sm font-semibold">Select an option</h6></div>
                    <div className="dropdown-item"><span className="badge badge-sm bg-soft-success text-success">Done</span></div>
                    <div className="dropdown-item"><span className="badge badge-sm bg-soft-warning text-warning">In progress</span></div>
                    <div className="dropdown-item"><span className="badge badge-sm bg-soft-primary text-primary">Testing</span></div>
                    <div className="dropdown-item"><span className="badge badge-sm bg-soft-danger text-danger">Canceled</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-3"><span className="badge badge-sm bg-warning text-white">In progress</span></div>
            </div>
            <div className="list-group-item">
              <div className="d-flex align-items-center">
                <h6 className="text-sm text-muted font-semibold">Priority</h6>
                <div className="dropdown ms-auto">
                  <a href="#" className="text-muted text-primary-hover" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-gear"></i></a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div className="dropdown-header"><h6 className="text-sm font-semibold">Select an option</h6></div>
                    <div className="dropdown-item">
                      <span className="badge badge-sm bg-soft-danger text-danger"><i className="bi bi-exclamation-circle-fill me-2"></i>High</span>
                    </div>
                    <div className="dropdown-item">
                      <span className="badge badge-sm bg-soft-warning text-warning"><i className="bi bi-stopwatch-fill me-2"></i>Medium</span>
                    </div>
                    <div className="dropdown-item">
                      <span className="badge badge-sm bg-soft-success text-success"><i className="bi bi-hand-thumbs-up-fill me-2"></i>Low</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <span className="badge badge-sm bg-soft-success text-success"><i className="bi bi-hand-thumbs-up-fill me-2"></i>Low</span>
              </div>
            </div>
            <div className="list-group-item">
              <h6 className="text-sm text-muted font-semibold">Due date</h6>
              <div className="mt-3">
                <div className="datepicker d-flex gap-2 align-items-center">
                  <input type="text" className="form-control form-control-flush text-sm text-muted font-semibold flatpickr-input" placeholder="Select date" data-input="" />
                  <a href="#" className="text-muted text-primary-hover" data-toggle=""><i className="bi bi-calendar-event"></i></a>
                </div>
              </div>
            </div>
            <div className="list-group-item">
              <div>
                <h6 className="text-sm text-muted font-semibold">Notifications</h6>
                <button type="button" className="btn btn-neutral btn-sm w-full mt-3"><i className="bi bi-bell me-2"></i>Subscribe</button>
                <small className="d-block mt-2 text-muted">You’re not receiving notifications from this thread.</small>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  </div>
  )
}

export default RightPanel
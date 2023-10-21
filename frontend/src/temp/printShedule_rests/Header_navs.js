<Nav variant="tabs">
          <Nav.Item>
            <Nav.Link onClick={() => handleClick('sm1')} className={selectedTab === 'SM-1' ? 'active' : ''}>SM-1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => handleClick('sm2')} className={selectedTab === 'SM-2' ? 'active' : ''}>SM-2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => handleClick('rapida')} className={selectedTab === 'Rapida' ? 'active' : ''}>Rapida</Nav.Link>
          </Nav.Item>
        </Nav>
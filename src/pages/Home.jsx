import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Nav, Dropdown } from "react-bootstrap";
import Slider from "../ui/Slider.jsx";
import {
  fetchCountries,
  loadMore,
  setRegion,
} from "../slices/countriesSlice.jsx";
import { TbBrandFacebook, TbBrandTwitter } from "react-icons/tb";
import { FiYoutube, FiMenu, FiX } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import "./Home.css";

const FILTERS = ["All", "Asia", "Europe"];

export default function Home() {
  const dispatch = useDispatch();
  const { filtered, status, visibleCount, region } = useSelector(
    (s) => s.countries
  );
  const [activeSlide, setActiveSlide] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCountries());
  }, [status, dispatch]);

  const slides = useMemo(() => filtered.slice(0, 10), [filtered]);
  const visible = filtered.slice(0, visibleCount);

  return (
    <Container className="py-3">
      <Row className="align-items-center mb-3">
  {/* Left side - Title */}
  <Col xs={6} md={6} className="text-start">
    <h3 className="m-0 fw-bold">Countries</h3>
  </Col>

  {/* Desktop filters */}
  <Col xs={6} className="d-none d-md-block text-end">
    <Nav className="justify-content-end filter-tabs">
      {FILTERS.map((f) => (
        <Nav.Item key={f}>
          <Nav.Link
            active={region === f}
            onClick={() => dispatch(setRegion(f))}
          >
            {f}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  </Col>

  {/* Mobile hamburger */}
  <Col xs={6} className="d-md-none text-end">
    <Button
      variant="link"
      className="p-0"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
    </Button>
  </Col>
</Row>

      {menuOpen && (
        <div className="mobile-filter p-3 border rounded mb-3">
          {FILTERS.map((f) => (
            <div
              key={f}
              className={`filter-item ${region === f ? "active" : ""}`}
              onClick={() => {
                dispatch(setRegion(f));
                setMenuOpen(false);
              }}
            >
              {f}
            </div>
          ))}
        </div>
      )}
      <h3 className="m-0 fw-bold welcome-title mb-4">WELCOME</h3>

      <Row className="g-3 mb-4">
        <Col md={8} xs={12}>
          <Slider items={slides} onActiveChange={setActiveSlide} />
        </Col>

        <Col md={4} xs={12}>
          {activeSlide && (
            <div className="p-2 border h-100 d-flex flex-column justify-content-center">
              <div className="ratio ratio-4x3 mb-2 bg-light rounded overflow-hidden">
                <img
                  src={activeSlide.flag}
                  alt={`${activeSlide.name} flag`}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h5 className="mb-1">{activeSlide.name}</h5>
              <div className="text-muted">{activeSlide.region || "—"}</div>
            </div>
          )}
        </Col>
      </Row>

      <Row className="g-3 ">
        {visible.map((c) => (
          <Col key={c.name} md={3} sm={6} xs={12}>
            <div className="border p-2 h-100 d-flex align-items-center gap-2 country-card">
              <div
                className="ratio ratio-1x1 rounded bg-light overflow-hidden"
                style={{ width: 52 }}
              >
                <img
                  src={c.flag}
                  alt={c.name}
                  className="w-100 h-100 flag-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="ml-3">
                <div className="fw-semibold country-name">{c.name}</div>
                <div className="text-muted small region-name">
                  {c.region || "—"}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {visible.length < filtered.length && (
        <div className="text-center mt-3">
          <Button
            variant="dark"
            onClick={() => dispatch(loadMore())}
            className="loadMore-btn"
          >
            Load more
          </Button>
        </div>
      )}

      <div className="social-icons">
        <TbBrandFacebook />
        <TbBrandTwitter />
        <FiLinkedin />
        <FiYoutube />
      </div>

      <div className="text-center text-muted small mb-4 text-exp">
        Example@email.com
      </div>

      <div className="text-center text-muted small mt-4 text-copy">
        Copyright © 2020 Name. All rights reserved.
      </div>
    </Container>
  );
}

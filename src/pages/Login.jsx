import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Spinner, Alert, Navbar, Nav, Form } from 'react-bootstrap'
import { fetchCountries, loadMore, setRegion } from '../slices/countriesSlice.jsx'
import Slider from '../ui/Slider.jsx'
import CountryCard from '../ui/CountryCard.jsx'


const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar']


export default function Home() {
const dispatch = useDispatch()
const { filtered, status, error, visibleCount, region } = useSelector((s) => s.countries)


useEffect(() => {
dispatch(fetchCountries())
}, [dispatch])


const visible = filtered.slice(0, visibleCount)


return (
<>
<Navbar bg="light" expand="md" className="shadow-sm">
<Container>
<Navbar.Brand className="fw-bold">MT • Countries</Navbar.Brand>
<Navbar.Toggle aria-controls="nav" />
<Navbar.Collapse id="nav">
<Nav className="ms-auto gap-2 align-items-center">
<Form.Select
value={region}
onChange={(e) => dispatch(setRegion(e.target.value))}
style={{ maxWidth: 220 }}
>
{REGIONS.map((r) => (
<option key={r} value={r}>{r}</option>
))}
</Form.Select>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>


<Slider />


<Container className="py-4">
{status === 'loading' && (
<div className="d-flex justify-content-center py-5">
<Spinner animation="border" />
</div>
)}
{status === 'failed' && <Alert variant="danger">{error}</Alert>}


<Row xs={1} sm={2} md={3} lg={4} className="g-3">
{visible.map((c) => (
<Col key={c.name}>
<CountryCard country={c} />
</Col>
))}
</Row>


{visible.length === 0 && status === 'succeeded' && (
<p className="text-center text-muted py-4">No countries found for this region.</p>
)}


{visible.length < filtered.length && (
  <div className="d-flex justify-content-center mt-4">
<Button onClick={() => dispatch(loadMore())} size="lg">Load More</Button>
</div>
)}
</Container>
</>
)
}
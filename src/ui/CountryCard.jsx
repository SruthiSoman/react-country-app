import { Card } from "react-bootstrap";

export default function CountryCard({ country }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="ratio ratio-16x9 bg-light rounded-top overflow-hidden">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      <Card.Body>
        <Card.Title className="mb-1">{country.name}</Card.Title>
        <Card.Text className="text-muted">
          Region: {country.region || "—"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

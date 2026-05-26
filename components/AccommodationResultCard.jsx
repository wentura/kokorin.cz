import PortfolioObjectCard from "@/components/PortfolioObjectCard";

/**
 * Karta objektu ve filtrovaném seznamu (sdílená kostra napříč webem).
 */
export default function AccommodationResultCard({
  item,
  onBooking,
  trackingSection = "accommodation-search",
}) {
  return (
    <PortfolioObjectCard
      item={item}
      onBooking={onBooking}
      section={trackingSection}
    />
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const PaginationComponent = ({ count,currentPage ,handlePaginationClick}) => {
  const pageNumbers = Array.from({ length: count }, (_, index) => index + 1);
  return (
    <Pagination>
      <PaginationContent>
      {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink onClick={()=>{handlePaginationClick(pageNumber)}} isActive={currentPage === pageNumber} href={`#${pageNumber}`}>{pageNumber}</PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;

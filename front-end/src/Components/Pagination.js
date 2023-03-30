import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({
  totalAmount,
  start,
  end,
  currentPage,
  showAmount,
  handlePagination
}) {
  function getCurrentPageLength() {
    let amountOfPages = [];
    let pageNumber = 1;
    const totalEntries = totalAmount;

    for (let page = 1; page <= totalEntries; page += showAmount) {
      amountOfPages.push(pageNumber);
      pageNumber += 1;
    }

    return amountOfPages;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {totalAmount ? start + 1 : totalAmount}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {end > totalAmount ? totalAmount : end}
            </span>{' '}
            of <span className="font-medium">{totalAmount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() =>
                handlePagination(
                  showAmount,
                  currentPage - 1,
                  getCurrentPageLength().length
                )
              }
              className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {showAmount
              ? getCurrentPageLength().map((page) => {
                  return (
                    <p
                      onClick={() =>
                        handlePagination(
                          showAmount,
                          page,
                          getCurrentPageLength().length
                        )
                      }
                      className={`${
                        currentPage === page
                          ? 'relative z-10 inline-flex items-center bg-[#64aa85] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                          : 'relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex'
                      } cursor-pointer`}
                    >
                      {page}
                    </p>
                  );
                })
              : ''}

            <span
              className={`${
                getCurrentPageLength().length > 6 ? '' : 'hidden'
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
            >
              ...
            </span>
            <div
              onClick={() =>
                handlePagination(
                  showAmount,
                  currentPage + 1,
                  getCurrentPageLength().length
                )
              }
              className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export const SkeletonHeader = () => (
  <div className="w-full lg:w-4/5 mx-auto py-6 bg-white mt-6 rounded-xl px-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
    <div className="h-6 bg-gray-200 rounded w-32 mx-auto mt-2"></div>
  </div>
);

export const SkeletonSearchBar = () => (
  <div className="w-full lg:w-4/5 mx-auto py-6 bg-white mt-6 rounded-xl px-6 animate-pulse">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="w-full md:w-[40%] h-10 bg-gray-200 rounded-full"></div>
      <div
        className="w-full md:w-auto h-12 bg-gray-200 rounded-xl"
        style={{ width: "160px" }}
      ></div>
    </div>
  </div>
);

export const SkeletonTable = () => (
  <div className="w-full lg:w-4/5 mx-auto py-6 bg-white mt-6 rounded-t-xl px-6 animate-pulse">
    {/* Desktop Skeleton */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </th>
            <th className="px-4 py-3">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </th>
            <th className="px-4 py-3">
              <div className="h-4 bg-gray-300 rounded w-28"></div>
            </th>
            <th className="px-4 py-3">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </th>
            <th className="px-4 py-3">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Skeleton */}
    <div className="sm:hidden space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonPagination = () => (
  <div className="w-full lg:w-4/5 mx-auto py-4 bg-white rounded-b-xl px-6 animate-pulse">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="h-10 bg-gray-200 rounded w-32"></div>
      <div className="flex gap-2">
        <div className="h-10 w-10 bg-gray-200 rounded"></div>
        <div className="h-10 w-10 bg-gray-200 rounded"></div>
        <div className="h-10 w-10 bg-gray-200 rounded"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>
  </div>
);

import React from 'react'
import { IoChevronForward } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({links}) {
    return (
      <div className="flex items-center text-sm text-gray-600 mb-4">
        {links.map((link, index) => (
          <React.Fragment key={link.url}>
            <Link to={link.url} className="hover:underline">{link.name}</Link>
            {index < links.length - 1 && (
              <IoChevronForward className="mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
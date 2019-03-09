import React from 'react'
import { Card, CardHeader, CardContent } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Neighborhood from '../../domain/Neighborhood';

type Props = {
  neighborhood: Neighborhood;
  fetching: boolean,
}

export default function NeighborhoodDetail({ neighborhood, fetching }: Props) {
  return (
    <Card>
      <CardHeader
        title={neighborhood.name}
        subheader={neighborhood.donated >= 0 ? `Donation: ${neighborhood.donated}$` : undefined}
      />

      <CardContent>
        {fetching &&
          <CircularProgress color="primary" size={30} thickness={5} />
        }

        {neighborhood.organisations.map(organisation => (
          <div key={organisation.reference} />
        ))}
      </CardContent>
    </Card>
  )
}
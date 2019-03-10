import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Neighborhood from '../../domain/Neighborhood';

type Props = {
  neighborhood: Neighborhood;
  fetching: boolean,
}

function NeighborhoodDetail({ neighborhood, fetching, history }: Props) {
  console.log(neighborhood);
  return (
    <Card>
      <CardHeader
        title={neighborhood.name}
        subheader={<div>
          <Typography>
            {neighborhood.donators >= 0 ? `Donateurs: ${neighborhood.donators} personnes` : undefined}
          </Typography>
          <Typography>
            {neighborhood.donated >= 0 ? `Donation: ${neighborhood.donated}$` : undefined}
          </Typography>
        </div>
        }
      />

      <CardContent>

        {fetching &&
          <CircularProgress color="primary" size={30} thickness={5} />
        }

        {!fetching &&
          <React.Fragment>
            <Typography variant="h6">
              Organisations
            </Typography>

            {neighborhood.organisations.length > 0 ?
              <List>
                {neighborhood.organisations.map(organization => (
                  <ListItem button key={organization.reference} onClick={() => history.push(`/org/${organization.reference}`, { org: organization })}>
                    <ListItemText primary={organization.name} secondary={organization.address} />
                  </ListItem>
                ))
                }
              </List>
              :
              <Typography style={{ color: 'grey', fontSize: '12px' }}>
                Aucune organisation répertoriée
            </Typography>
            }
          </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

export default withRouter(NeighborhoodDetail)
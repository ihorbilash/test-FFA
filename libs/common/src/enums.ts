export enum RequestStatus {
  new = 'new',
  in_progress = 'in_progress',
  done = 'done',
}

export enum RabbitRoutingKey {
  TO_IN_PROGRESS = 'request.to_in_progress',
  TO_DONE = 'request.to_done',
}

export const QUEUE_EXCHANGE = 'requests.exchange';

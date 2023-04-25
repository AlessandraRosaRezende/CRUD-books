export type Identifiable = {
  id: number,
  sn?: string,
}

export type NewEntity<T> = Omit<T, Identifiable['id']>

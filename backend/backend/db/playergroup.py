class PlayerGroup:

    def __init__(self, id, group, server, negated, expires):
        self.id = id
        self.group = group
        self.server = server
        self.negated = negated
        self.expires = expires

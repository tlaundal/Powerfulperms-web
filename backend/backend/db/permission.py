class Permission:

    def __init__(self, id, permission, world, server, expires):
        self.id = id
        self.permission = permission
        self.world = world
        self.server = server
        self.expires = expires
